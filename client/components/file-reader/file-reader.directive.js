/* @ngInject */
function fileReader() {
  return {
    scope: {
      fileReader: '=',
    },
    link(s, element) {
      const scope = s;
      element.on('change', (changeEvent) => {
        const files = changeEvent.target.files;
        if (files.length) {
          const r = new FileReader();
          r.onload = (e) => {
            const contents = e.target.result;
            scope.$apply(() => {
              scope.fileReader = contents;
            });
          };

          r.readAsText(files[0]);
        }
      });
    },
  };
}

export default fileReader;
