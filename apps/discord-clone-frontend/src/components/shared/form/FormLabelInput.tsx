import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface FormLabelInputProps<TFieldValues extends FieldValues> {
  label: string;
  type: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}
const FormLabelInput = <TFieldValues extends FieldValues>({
  label,
  type,
  name,
  register,
  errors,
}: FormLabelInputProps<TFieldValues>) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white font-normal text-lg">{label}</label>
      <input
        type={type}
        className="bg-zinc-900 rounded-md p-2 font-normal text-lg"
        {...register(name)}
      />
      {errors[name] && "message" in errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default FormLabelInput;
