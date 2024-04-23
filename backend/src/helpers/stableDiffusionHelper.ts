import Config from '../config'
import axios from 'axios';

const BASEURL = Config.SD_BASE_URL

export interface ITxt2ImgRequest {
    prompt?: string;
    negative_prompt?: string;
    sampler_name?: string;
    steps?: number;
    width?: number;
    height?: number;
    cfg_scale?: number;
    seed?: number;
    enable_hr?: boolean;
    hr_upscaler?: string;
    hr_second_pass_steps?: number;
    denoising_strength?: number;
    hr_scale?: number;
    hr_checkpoint_name?: string;
    hr_sampler_name?: string;
    hr_prompt?: string;
    hr_negative_prompt?: string;
    hr_scheduler?: string;
}
export interface ITxt2ImgResponse {
    images: string[];
    parameters: object;
    info: string;
}


export async function txt2imgRequest(payload: ITxt2ImgRequest): Promise<ITxt2ImgResponse> {
    const finalPayload = createTxt2ImgPayload({ ...payload });
    const response: ITxt2ImgResponse = await axios.post(BASEURL + "/sdapi/v1/txt2img", finalPayload)
    return response
}



// Функция для создания стандартного payload для запроса txt2img
// TODO: Вынести в отдельный конфиг payload
function createTxt2ImgPayload({
    prompt = '',
    negative_prompt = '[disfigured, poorly drawn], [bad : wrong] anatomy, [extra | missing | floating | disconnected] limb, mutated, blurry',
    sampler_name = 'Euler a',
    steps = 22,
    width = 640,
    height = 640,
    cfg_scale = 8.0,
    seed = -1,
    enable_hr = false,
    hr_upscaler = '4x_NMKD-Siax_200k',
    hr_second_pass_steps = 8,
    denoising_strength = 0.38,
    hr_scale = 1.6,
    hr_sampler_name = 'DPM++ 2M',
    hr_prompt = prompt,
    hr_negative_prompt = negative_prompt,
    hr_scheduler = 'Karras'
}: Partial<ITxt2ImgRequest> = {}): ITxt2ImgRequest {
    return {
        prompt,
        negative_prompt,
        sampler_name,
        steps,
        width,
        height,
        cfg_scale,
        seed,
        enable_hr,
        hr_upscaler,
        hr_second_pass_steps,
        denoising_strength,
        hr_scale,
        hr_sampler_name,
        hr_prompt,
        hr_negative_prompt,
        hr_scheduler
    };
}