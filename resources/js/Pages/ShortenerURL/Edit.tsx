import IconButton from "@/Components/IconButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Head, useForm } from "@inertiajs/react";
import { ChangeEvent, FormEventHandler, useRef } from "react";


export type EditShortenerURLProps = {
  item: {
    id: string;
    code: string;
    title: string;
    original_url: string;
    shortener_url: string;
    disabled: boolean;
  }
}

export default function EditShortenerURL({
  auth,
  item
}: PageProps<EditShortenerURLProps>) {
  const { id, title, original_url } = item;
  const btnRef = useRef<HTMLButtonElement>(null);
  const { data, setData, patch, processing, errors, reset } = useForm({
    title,
    original_url,
  });

  const handlerChange =
    (field: "title" | "original_url") =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setData(field, event.target.value);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route("shortenerUrl.update", id), {
      onFinish: () => reset("title", "original_url"),
    });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      breadcrumbs={[
        {
          href: route("shortenerUrl.index"),
          label: "List shortener urls",
        },
        {
          href: route("shortenerUrl.update", item.id),
          label: "Edit shortener url",
        },
      ]}
      header={
        <>
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Edit - Shortened URLs
          </h2>
          <IconButton
            icon={<CheckIcon className="size-4" />}
            aria-label="Save"
            className="text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => btnRef.current?.click()}
            disabled={processing}
          />
        </>
      }
    >
      <Head title="Edit - Shortener Url" />
      <div className="w-full px-6 py-6 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="title" value="Title" />
            <TextInput
              id="title"
              name="title"
              value={data.title}
              className="mt-1 block w-full"
              isFocused={true}
              onChange={handlerChange("title")}
              required
            />
            <InputError message={errors.title} className="mt-2" />
          </div>
          <div className="mt-4">
            <InputLabel htmlFor="original_url" value="Original Url" />
            <TextInput
              id="original_url"
              name="original_url"
              type="url"
              value={data.original_url}
              className="mt-1 block w-full"
              onChange={handlerChange("original_url")}
              required
            />
            <InputError message={errors.original_url} className="mt-2" />
          </div>
          <button ref={btnRef} type="submit" className="hidden"></button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
}
