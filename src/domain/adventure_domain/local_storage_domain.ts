import { Draggable } from "../canvas_domain";
import { Moment, PositionedMoment } from "./types";

export class LocalStorageDomain {
  saveToJson(object: any) {
    const output = JSON.stringify(object);
    const blob = new Blob([output]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    this.downloadFile(fileDownloadUrl);
  }

  downloadFile(absoluteUrl: string) {
    const link = document.createElement("a");
    link.setAttribute("saveAs", "true");
    link.href = absoluteUrl;
    link.download = "download.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getPositionedMoments(
    positions: Draggable[],
    moments: Moment[]
  ): PositionedMoment[] {
    const result: PositionedMoment[] = [];

    moments.forEach((moment) => {
      result.push({
        ...moment,
        position: positions.find((v) => v.id === moment.id)?.position ?? {
          x: 0,
          y: 0,
        },
      });
    });

    return result;
  }

  loadPositionedMoments(jsonText: string): PositionedMoment[] {
    const parsed = JSON.parse(jsonText);
    //Yeah... so this is ugly. Needs to be fixed.
    return parsed as PositionedMoment[];
  }
}
