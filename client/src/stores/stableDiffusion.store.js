import { defineStore } from "pinia";
import { surpriseMePrompts } from "@/constants";

const useStableDiffusionStore = defineStore({
  id: "stableDiffusion",
  state: () => ({
    model: null,
    prompt: null,
    negativePrompt: null,
    hires: null,
    image: null,
    generatedImage: null,
    isGenerated: false,
  }),
  actions: {
    setModel(model) {
      this.model = model;
    },
    setImage(image) {
      this.image = image;
    },
    clearPrompt() {
      this.prompt = null;
      this.negativePrompt = null;
    },
    getRandomPrompt() {
      const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
      const randomPrompt = surpriseMePrompts[randomIndex];
      if (randomPrompt === this.prompt) return this.getRandomPrompt();
      this.prompt = randomPrompt;
    },
  },
});

export default useStableDiffusionStore;
