export function exportJson(json:string,filename:string) {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  }

  export function browseFile() {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.addEventListener('change', (e:any) => {
        const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event:any) => {
                const content = event.target.result;
                resolve(content);
            }   ;
            reader.readAsText(file);
        }
        });

        input.click();
    })
  }

  export function buildTree(data:any[]) {
    const map:any = {};
    const root:any[] = [];
  
    data.forEach((item:any) => {
      map[item.id] = {...item, children: [] };
      if (item.parentId) {
        if (!map[item.parentId].children) {
          map[item.parentId].children = [];
        }
        map[item.parentId].children.push(map[item.id]);
      } else {
        root.push(map[item.id]);
      }
    });
    return root;
  }