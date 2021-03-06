import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FabricComponent,
  FabricDirective,
  FabricConfigInterface,
} from 'ngx-fabric-wrapper';
import { fabric } from 'fabric';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent implements AfterViewInit {
  public toogle = true;
  public tool = 'Rectangle';
  public action = 'none';
  public color = 'black';
  public x0;
  public x2;
  public y2;
  public y0;
  public rectangle;
  public circle;
  public line;
  public square;
  public ellipse;
  public selected = null;
  public mode = 'add';
  public copiedObject;
  public copiedObjects = new Array();
  public cutted = false;
  public group;
  public state = [];
  public mods = 0;
  public savedCanvas;
  public show: boolean = true;
  public myjson;
  public data: any = {
    objects: [
      {
        type: 'group',
        top: 22,
        left: 72,
        width: 200,
        height: 60,
        objects: [
          {
            type: 'rect',
            top: -30,
            left: -100,
            width: 200,
            height: 60,
            fill: '#cfcfcf',
          },
          {
            type: 'text',
            width: 200,
            height: 60,
            fontSize: 24,
            text: 'Example object',
            originX: 'center',
            originY: 'center',
          },
        ],
      },
    ],
  };

  public type: string = 'component';
  public drawMode = false;
  public disabled: boolean = false;
  // ngOnInit() {
  //   if (this.disabled == false) this.disabled = true;
  // }
  public config: FabricConfigInterface = {
    isDrawingMode: this.drawMode,
    renderOnAddRemove: true,
  };

  @ViewChild(FabricComponent, { static: false }) componentRef?: FabricComponent;
  @ViewChild(FabricDirective, { static: false }) directiveRef?: FabricDirective;
  public canvas;

  constructor() {
  }
  ngAfterViewInit(){
    this.canvas = this.componentRef.directiveRef.fabric();
    console.log(this.canvas.toDataURL('png'))
  }
  public toggleType(): void {
    this.toogle == true ? (this.toogle = false) : (this.toogle = true);
  }
  public freeLine(){
    this.canvas.isDrawingMode=true;
    this.tool='Freeline'
  }
  public select(){
    this.canvas.isDrawingMode=false;
    this.tool='Select'
    console.log(this.canvas.toDataURL('png'))
  }

  public mouseDown(mouseEvent) {
    this.x0 = mouseEvent.pointer.x;
    this.y0 = mouseEvent.pointer.y;
    switch (this.tool) {
      case 'Freeline': {
        break;
      }
      case 'Straightline': {
        this.canvas.isDrawingMode = false;
        var coordinates = [this.x0, this.y0, this.x0, this.y0];
        this.line = new fabric.Line(coordinates, {
          strokeWidth: 3,
          stroke: this.color,
        });
        this.canvas.add(this.line);
        this.updateModifications(true);
        this.selected = this.line;
        break;
      }
      case 'Rectangle': {
        this.canvas.isDrawingMode = false;
        if (this.toogle) {
          this.rectangle = new fabric.Rect({
            top: this.y0,
            left: this.x0,
            fill: this.color,
          });
          this.canvas.add(this.rectangle);
          this.updateModifications(true);
          this.selected = this.rectangle;
          break;
        } else {
          this.rectangle = new fabric.Rect({
            top: this.y0,
            left: this.x0,
            stroke: this.color,
            fill: null,
          });
          this.canvas.add(this.rectangle);
          this.updateModifications(true);
          this.selected = this.rectangle;
          break;
        }
      }
      case 'Square': {
        this.canvas.isDrawingMode = false;
        if (this.toogle) {
          this.square = new fabric.Rect({
            top: this.y0,
            left: this.x0,
            fill: this.color,
          });
        } else {
          this.square = new fabric.Rect({
            top: this.y0,
            left: this.x0,
            fill: null,
            stroke: this.color,
          });
        }
        this.canvas.add(this.square);
        this.updateModifications(true);
        this.selected = this.square;
        break;
      }
      case 'Ellipse': {
        this.canvas.isDrawingMode = false;
        if (this.toogle) {
          this.ellipse = new fabric.Ellipse({
            originX: 'center',
            originY: 'center',
            top: this.y0,
            left: this.x0,
            fill: this.color,
            rx: 0,
            ry: 0,
          });
        } else {
          this.ellipse = new fabric.Ellipse({
            originX: 'center',
            originY: 'center',
            top: this.y0,
            left: this.x0,
            fill: null,
            stroke: this.color,
            rx: 0,
            ry: 0,
          });
        }

        this.canvas.add(this.ellipse);
        this.updateModifications(true);
        this.selected = this.ellipse;
        break;
      }
      case 'Circle': {
        this.canvas.isDrawingMode = false;
        if (this.toogle) {
          this.circle = new fabric.Circle({
            originX: 'center',
            originY: 'center',
            top: this.y0,
            left: this.x0,
            fill: this.color,
            radius: 0,
          });
        } else {
          this.circle = new fabric.Circle({
            originX: 'center',
            originY: 'center',
            top: this.y0,
            left: this.x0,
            fill: null,
            stroke: this.color,
            radius: 0,
          });
        }
        this.canvas.add(this.circle);
        this.updateModifications(true);
        this.selected = this.circle;
        break;
      }
    }
    // console.log(mouseEvent);
  }
  public mouseMove(mouseEvent) {
    this.x2 = mouseEvent.pointer.x;
    this.y2 = mouseEvent.pointer.y;
    let changeInX = this.x2 - this.x0;
    let changeInY = this.y2 - this.y0;
    switch (this.tool) {
      case 'Straightline': {
        if (this.selected !== null) {
          this.selected.set({
            x2: this.x2,
            y2: this.y2,
          });
        }
        this.canvas.renderAll();
        break;
      }
      case 'Rectangle': {
        if (this.selected !== null) {
          this.selected.set({
            width: changeInX,
            height: changeInY,
          });
        }
        this.canvas.renderAll();
        break;
      }
      case 'Square': {
        if (Math.abs(changeInX) >= Math.abs(changeInY)) {
          if (changeInX > 0) {
            if (changeInY < 0) changeInY = -changeInX;
            //TOP RIGHT: Y gets value of -X
            else changeInY = changeInX; //BOTTOM RIGHT: Y gets value of X
          } else if (changeInX < 0) {
            if (changeInY < 0) changeInY = changeInX;
            //TOP LEFT: Y gets value of X
            else changeInY = -changeInX; //BOTTOM LEFT: Y gets value of -X
          }
        } else if (Math.abs(changeInX) < Math.abs(changeInY)) {
          if (changeInY > 0) {
            if (changeInX < 0) changeInX = -changeInY;
            //BOTTOM LEFT: X gets value of -Y
            else changeInX = changeInY; //BOTTOM RIGHT: X gets value of Y
          } else if (changeInY < 0) {
            if (changeInX < 0) changeInX = changeInY;
            //TOP LEFT: X gets value of Y
            else changeInX = -changeInY; //TOP RIGHT: X gets value of -Y
          }
        }

        if (this.selected !== null) {
          this.selected.set({
            width: changeInX,
            height: changeInY,
          });
        }
        this.canvas.renderAll();
        break;
      }
      case 'Ellipse': {
        if (this.selected !== null) {
          this.selected.set({
            rx: Math.abs(changeInX),
            ry: Math.abs(changeInY),
          });
        }
        this.canvas.renderAll();
        break;
      }
      case 'Circle': {
        if (Math.abs(changeInX) >= Math.abs(changeInY)) changeInY = changeInX;
        else if (Math.abs(changeInX) < Math.abs(changeInY))
          changeInX = changeInY;

        if (this.selected !== null) {
          this.selected.set({
            radius: Math.abs(changeInX),
          });
        }
        this.canvas.renderAll();
        break;
      }
    }
  }
  public updateModifications(saveModification) {
    if (saveModification === true) {
      this.myjson = JSON.stringify(this.canvas);
      this.state.push(this.myjson);
    }
  }
  public mouseUp(mouseEvent) {
    if (this.mode == 'add') {
      this.selected = null;
    }
    this.x0 = 0;
    this.y0 = 0;
  }
  public deleteObjects() {
    this.canvas.isDrawingMode = false;
    console.log(this.canvas.isDrawingMode);
    var activeObject = this.componentRef.directiveRef
        .fabric()
        .getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();
    if (activeObject) {
      this.canvas.remove(activeObject);
    } else if (activeGroup) {
      var objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach(function (object) {
        this.componentRef.directiveRef.remove(object);
      });
    }
  }

  public cutObjects() {
    this.canvas.isDrawingMode = false;

    this.copiedObjects = new Array();
    if (this.canvas.getActiveGroup()) {
      this.componentRef.directiveRef
        .fabric()
        .getActiveGroup()
        .getObjects()
        .forEach(function (o) {
          var object = fabric.util.object.clone(o);
          this.copiedObjects.push(object);
        });
      this.componentRef.directiveRef
        .fabric()
        .remove(this.canvas.getActiveGroup().getObjects());
    } else if (this.canvas.getActiveObject()) {
      var object = fabric.util.object.clone(this.canvas.getActiveObject());
      this.copiedObject = object;
      this.copiedObjects = new Array();
    }

    var activeObject = this.componentRef.directiveRef
        .fabric()
        .getActiveObject(),
      activeGroup = this.canvas.getActiveGroup();
    if (activeObject) {
      this.canvas.remove(activeObject);
    } else if (activeGroup) {
      var objectsInGroup = activeGroup.getObjects();
      this.canvas.discardActiveGroup();
      objectsInGroup.forEach(function (object) {
        this.componentRef.directiveRef.remove(object);
      });
    }
    this.cutted = true;
  }

  public copyObjects() {
    this.canvas.isDrawingMode = false;

    this.copiedObjects = new Array();
    if (this.canvas.getActiveGroup()) {
      this.componentRef.directiveRef
        .fabric()
        .getActiveGroup()
        .getObjects()
        .forEach(function (o) {
          var object = fabric.util.object.clone(o);
          this.copiedObjects.push(object);
        });
    } else if (this.canvas.getActiveObject()) {
      var object = fabric.util.object.clone(this.canvas.getActiveObject());
      this.copiedObject = object;
      this.copiedObjects = new Array();
    }
  }

  public pasteObjects() {
    this.canvas.isDrawingMode = false;

    if (this.cutted == false) {
      if (this.copiedObjects.length > 0) {
        for (var i in this.copiedObjects) {
          this.copiedObjects[i] = fabric.util.object.clone(
            this.copiedObjects[i]
          );

          this.copiedObjects[i].set('top', this.copiedObjects[i].top + 100);
          this.copiedObjects[i].set('left', this.copiedObjects[i].left + 100);

          this.canvas.add(this.copiedObjects[i]);
          this.componentRef.directiveRef
            .fabric()
            .item(this.canvas.size() - 1).hasControls = true;
        }
      } else if (this.copiedObject) {
        this.copiedObject = fabric.util.object.clone(this.copiedObject);
        this.copiedObject.set('top', 150);
        this.copiedObject.set('left', 150);
        this.canvas.add(this.copiedObject);
        this.componentRef.directiveRef
          .fabric()
          .item(this.canvas.size() - 1).hasControls = true;
      }
    } else if (this.cutted == true) {
      if (this.copiedObjects.length > 0) {
        for (var i in this.copiedObjects) {
          this.copiedObjects[i] = fabric.util.object.clone(
            this.copiedObjects[i]
          );

          this.copiedObjects[i].set('top', this.copiedObjects[i].top + 100);
          this.copiedObjects[i].set('left', this.copiedObjects[i].left + 100);

          this.canvas.add(this.copiedObjects[i]);
          this.componentRef.directiveRef
            .fabric()
            .item(this.canvas.size() - 1).hasControls = true;
        }
      } else if (this.copiedObject) {
        this.copiedObject = fabric.util.object.clone(this.copiedObject);
        this.copiedObject.set('top', 150);
        this.copiedObject.set('left', 150);
        this.canvas.add(this.copiedObject);
        this.componentRef.directiveRef
          .fabric()
          .item(this.canvas.size() - 1).hasControls = true;
      }
      this.cutted = false;
      this.copiedObjects = new Array();
    }
    this.canvas.renderAll();
  }

  public groupObjects() {
    this.canvas.isDrawingMode = false;

    this.group = new fabric.Group([], { left: 250, top: 200 });
    if (this.canvas.getActiveGroup()) {
      this.componentRef.directiveRef
        .fabric()
        .getActiveGroup()
        .getObjects()
        .forEach(function (o) {
          this.group.addWithUpdate(o);
          this.componentRef.directiveRef.remove(o);
        });
    }
    this.canvas.add(this.group);
  }

  public ungroupObjects() {
    this.canvas.isDrawingMode = false;

    var items = this.group._objects;
    this.group._restoreObjectsState();
    this.canvas.remove(this.group);
    for (var i = 0; i < items.length; i++) {
      this.canvas.add(items[i]);
    }
    this.canvas.renderAll();
  }
  public Undo() {
    this.canvas.isDrawingMode = false;

    if (this.mods < this.state.length) {
      this.canvas.clear().renderAll();
      this.componentRef.directiveRef
        .fabric()
        .loadFromJSON(this.state[this.state.length - 1 - this.mods - 1]);
      this.canvas.renderAll();
      this.mods += 1;
    }
  }
  public Redo() {
    this.canvas.isDrawingMode = false;

    if (this.mods > 0) {
      this.canvas.clear().renderAll();
      this.componentRef.directiveRef
        .fabric()
        .loadFromJSON(this.state[this.state.length - 1 - this.mods + 1]);
      this.canvas.renderAll();
      this.mods -= 1;
    }
  }

  public saveCanvas() {
    this.canvas.isDrawingMode = false;

    var currentCanvas = JSON.stringify(this.canvas);
    this.savedCanvas = currentCanvas;
    alert('Your current canvas has been saved!');
  }

  public loadCanvas() {
    this.canvas.isDrawingMode = false;

    this.canvas.loadFromJSON(this.savedCanvas);
    this.canvas.renderAll();
    alert('Your saved canvas has been loaded!');
  }
}
