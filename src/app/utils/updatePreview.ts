const updatePreview = (files: { name: string; content: string }[]) => {
    const tabs = document.getElementById('tabs');
    const tabContents = document.getElementById('tab-contents');
    if (tabs && tabContents) {
      tabs.innerHTML = '';
      tabContents.innerHTML = '';
  
      files.forEach((file, index) => {
        const tab = document.createElement('div');
        tab.className = 'tab' + (index === 0 ? ' active' : '');
        tab.innerText = file.name.replace('token-x-tractor-exports/', '');
        tab.onclick = () => {
          document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
          document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
          tab.classList.add('active');
          const activeContent = document.getElementById('content-' + index);
          if (activeContent) {
            activeContent.classList.add('active');
          }
        };
        tabs.appendChild(tab);
  
        const content = document.createElement('div');
        content.className = 'tab-content' + (index === 0 ? ' active' : '');
        content.id = 'content-' + index;
        content.innerText = file.content;
        tabContents.appendChild(content);
      });
    }
  };
  
  export default updatePreview;
  