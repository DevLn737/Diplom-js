import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // ! Заглушка
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjJmYzY0NzliYWFhMDYwYzVhZTRiZDAiLCJpYXQiOjE3MTQ0MDcwNDQwNzIsImV4cCI6MTcxNDQwOTYzNjA3Mn0.RlFfF54VnYfCC3xqzOcfUBNMpzuooKiSOwOUtlHyWkU";

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch(
          "http://localhost:4000/api/images/generate",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ prompt: form.prompt }),
          },
        );

        const data = await response.json();

        setForm({ ...form, photo: `data:image/png;base64,${data.image}` });
      } catch (error) {
        alert(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Пожалуйста, заполните запрос");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch(
          "http://localhost:4000/api/images/community",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              description: form.prompt,
              // Удаляем метаданные
              image: form.photo.split(",")[1],
            }),
          },
        );

        console.log("Пост успешно опубликован");
        navigate("/");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Пожалуйста, введите запрос и сгенерируйте изображение");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  return (
    <section className="mx-auto max-w-7xl">
      <div>
        <h1 className="text-[32px] font-extrabold text-[#222328]">Создавай!</h1>
        <p className="max-w[500px] mt-2 text-[16px] text-[#666e75]">
          Создавай творческие и визуально ошеломляющий изображения со Stable
          Diffusion и делись этим с сообществом, либо сохраняй для собственных
          проектов
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Ваше имя"
            type="text"
            name="name"
            placeholder="john doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Запрос"
            type="text"
            name="prompt"
            placeholder="a macro 35mm photograph of two mice in Hawaii, they're each wearing tiny swimsuits and are carrying tiny surf boards, digital art"
            value={form.prompt}
            handleChange={handleChange}
            isSurpireMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative flex h-64 w-64 items-center justify-center rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="previes"
                className="h-9/12 w-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex items-center justify-center rounded-lg bg-[rgba(0,0,0,0.5)]">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="w-full rounded-md bg-green-700 px-5  py-2.5 text-sm font-medium text-white sm:w-auto"
          >
            {generatingImg ? "Создаётся..." : "Создать"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[14px] text-[#666e75]">
            Как только вы создатите изображение, вы сможете поделиться им с
            другими в сообществе
          </p>
          <button
            type="submit"
            className="mt-3 w-full rounded-md bg-[#6469ff] px-5 py-2.5 text-center text-sm font-medium text-white sm:w-auto"
          >
            {loading ? "Делимся..." : "Поделиться с сообществом"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
