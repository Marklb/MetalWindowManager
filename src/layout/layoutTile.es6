module.exports =
class layoutTiles {
  constructor(win, layout) {
    this.win = win;
    this.layout = layout;

    this.containerElem = this.win.window.document.createElement('div');
    this.containerElem.classList.add('layout-selection-tile');
    // this.layoutsListElem.appendChild(this.containerElem);

    // Add layout title to the tile
    this.tileTitle = this.win.window.document.createElement('p');
    this.tileTitle.innerHTML = this.layout.getName();
    this.containerElem.appendChild(this.tileTitle);

    this.getElement().layoutObj = this;
  }

  getElement(){
    return this.containerElem;
  }

  setIsLast(b){
    this.containerElem.classList.add('last');
  }

}
