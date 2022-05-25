import { ObservableValue } from "../common/hex/observable_value";
import React from "react";

export interface Vector2 {
  x: number;
  y: number;
}

export interface Draggable {
  id: string;
  position: Vector2;
  ref: React.MutableRefObject<HTMLDivElement | null>;
  zIndex: number;
  isActive?: boolean;
  lastClicked?: boolean;
}

export class CanvasDomain {
  draggableComponents: ObservableValue<Draggable[]>;
  mouseOffset: Vector2;

  constructor() {
    this.draggableComponents = new ObservableValue<Draggable[]>([]);
    this.mouseOffset = { x: 0, y: 0 };
  }

  registerDraggable(
    newComponent: Omit<Draggable, "zIndex" | "lastClicked" | "isActive">
  ) {
    if (
      !this.draggableComponents
        .getValue()
        .find((draggable) => draggable.id === newComponent.id)
    )
      this.draggableComponents.transformValue((old) => [
        ...old,
        {
          ...newComponent,
          zIndex: old.length,
          isActive: false,
          lastClicked: false,
        },
      ]);
  }

  removeDraggable(id: string) {
    this.draggableComponents.transformValue((old) =>
      old.filter((v) => v.id !== id)
    );
  }

  handleMouseDown(id: string, mousePosition: Vector2) {
    const draggables = this.draggableComponents.getValue();
    const selected = draggables.find((v) => v.id === id);
    if (!selected) return;

    this.mouseOffset = {
      x: mousePosition.x - selected.position.x,
      y: mousePosition.y - selected.position.y,
    };
    const reordered = [...draggables.filter((v) => v.id !== id), selected];

    reordered.forEach((v, index) => {
      if (v.id !== id) {
        v.isActive = false;
        v.lastClicked = false;
      } else {
        v.lastClicked = true;
        v.isActive = true;
      }
      v.zIndex = index;
    });

    this.draggableComponents.setValue(reordered);
    this.handleMouseMove(id, mousePosition);
  }

  handleMouseUp() {
    this.draggableComponents.transformValue((values) =>
      values.map((v) => ({ ...v, isActive: false }))
    );
  }

  handleMouseMove(id: string, mousePosition: Vector2) {
    const selected = this.draggableComponents
      .getValue()
      .find((v) => v.id === id);
    if (!selected || !selected.isActive) return;

    selected.position = {
      x: mousePosition.x - this.mouseOffset.x,
      y: mousePosition.y - this.mouseOffset.y,
    };
    this.draggableComponents.setValue([...this.draggableComponents.getValue()]);
  }

  setPosition(id: string, position: Vector2) {
    const selected = this.draggableComponents
      .getValue()
      .find((v) => v.id === id);
    if (!selected || !selected.isActive) return;

    selected.position = position;
    this.draggableComponents.setValue([...this.draggableComponents.getValue()]);
  }

  clearLastClicked() {
    this.draggableComponents.transformValue((old) =>
      old.map((v) => ({ ...v, lastClicked: false }))
    );
  }

  dispose() {
    this.draggableComponents.dispose();
  }
}
