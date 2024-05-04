import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants/index";
export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
  // return surpriseMePrompts[Math.floor(Math.random() * surpriseMePrompts.length)];
}


export function downloadImage(name, photo) {
  FileSaver.saveAs(photo, `download-${name}.png`);
}