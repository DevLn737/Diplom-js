// // В интерфейсе перечисленны не все параметры, а только необходимые для конкретно моего приложения
// // Это всё таки не реализация полного api 
// export interface ITxt2ImgRequest {
//     prompt?: string;
//     negative_prompt?: string;
//     sampler_name?: string;
//     steps?: number;
//     width?: number;
//     height?: number;
//     cfg_scale?: number;
//     seed?: number;
//     enable_hr?: boolean;
//     hr_upscaler?: string;
//     hr_second_pass_steps?: number;
//     denoising_strength?: number;
//     hr_scale?: number;
//     hr_checkpoint_name?: string;
//     hr_sampler_name?: string;
//     hr_prompt?: string;
//     hr_negative_prompt?: string;
//     hr_scheduler?: string;
// }

// export default function createTxt2ImgPayload({
//     prompt = 'default_prompt',
//     negative_prompt = 'default_negative_prompt',
//     sampler_name = 'default_sampler_name',
//     steps = 10,
//     width = 800,
//     height = 600,
//     cfg_scale = 1.0,
//     seed = 12345,
//     enable_hr = false,
//     hr_upscaler = 'default_hr_upscaler',
//     hr_second_pass_steps = 5,
//     denoising_strength = 0.5,
//     hr_scale = 2.0,
//     hr_checkpoint_name = 'default_hr_checkpoint_name',
//     hr_sampler_name = 'default_hr_sampler_name',
//     hr_prompt = 'default_hr_prompt',
//     hr_negative_prompt = 'default_hr_negative_prompt',
//     hr_scheduler = 'default_hr_scheduler'
// }: Partial<ITxt2ImgRequest> = {}): ITxt2ImgRequest {
//     return {
//         prompt,
//         negative_prompt,
//         sampler_name,
//         steps,
//         width,
//         height,
//         cfg_scale,
//         seed,
//         enable_hr,
//         hr_upscaler,
//         hr_second_pass_steps,
//         denoising_strength,
//         hr_scale,
//         hr_checkpoint_name,
//         hr_sampler_name,
//         hr_prompt,
//         hr_negative_prompt,
//         hr_scheduler
//     };
// }

// // Пример использования
// // const request = createTxt2ImgRequest({
// //     prompt: 'custom_prompt',
// //     enable_hr: true,
// //     hr_sampler_name: 'sampler_name',
// //     hr_prompt: 'hr_prompt'
// // });
