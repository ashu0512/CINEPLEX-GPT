import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GptSearchBar = () => {
    const langKey = useSelector((store) => store.config.lang);
  return (
    <div className="pt-[10%] flex justify-center">
      <form className="w-1/2 bg-black grid grid-cols-12">
        <input type="text" placeholder={lang[langKey].gptSearchPlaceholder} className="p-4 m-4 col-span-9 bg-white"/>
        <button type="submit" className="bg-red-800 text-white px-4 py-2 m-4 rounded-lg col-span-3">{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar;
