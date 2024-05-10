import FileSaver from "file-saver";

export function downloadImage(name, photo) {
    FileSaver.saveAs(photo, `download-${name}.png`);
}