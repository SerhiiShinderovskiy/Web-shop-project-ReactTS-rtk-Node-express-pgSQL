import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../index";

// Простий хук "useAppDispatch", по суті це звичайний 'useDispatch' але тут буде типізація.Використовуватиметься типізований dispatch.
export const useAppDispatch = () => useDispatch<AppDispatch>();
// Хук "useAppSelector". Звичайний 'useSesector', але типізований. Для цього використовується спеціальний тип "TypedUseSelectorHook"
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Пофакту це все для того щоб комфортно працювати з типами