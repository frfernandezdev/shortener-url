import { useEffect, useMemo, useState, MouseEvent } from "react";
import IconButton from "@/Components/IconButton";
import { ModalConfirm } from "@/Components/ModalConfirm/ModalConfirm";
import { Table } from "@/Components/Table/Table";
import { TableHeadCell } from "@/Components/Table/TableHead";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import {
  PlusIcon,
  TrashIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Head, router, usePage } from "@inertiajs/react";
import axios from "axios";

const columns: TableHeadCell[] = [
  {
    id: "id",
    label: "id",
  },
  {
    id: "code",
    label: "code",
  },
  {
    id: "title",
    label: "title",
  },
  {
    id: "original_url",
    label: "Original Url",
  },
  {
    id: "actions",
    label: "Actions",
  },
];

export type ListShortenerURLProps = {
  token: string;
  paginator: {
    page: number;
    perPage: number;
    items: [];
    nextPageUrl: string;
    previousPageUrl: string;
    hasMorePages: boolean;
    total: number;
  };
};

export default function ListShortenerURL({
  auth,
  token,
  paginator,
}: PageProps<ListShortenerURLProps>) {
  const [rows, setRows] = useState(paginator.items);
  const [page, setPage] = useState(paginator.page);
  const [perPage, setPerPage] = useState(paginator.perPage);
  const [hasMorePages, setHasMorePages] = useState(paginator.hasMorePages);
  const [total, setTotal] = useState(paginator.total);
  const [remove, setRemove] = useState<string | null>(null);

  useEffect(() => {
    if (page === paginator.page) return;

    router.get(route("shortenerUrl.index", { page }));
  }, [page]);

  const handleRemove = async () => {
    await axios.delete(route("api.shortenerUrl.destroy", remove as string), {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    router.visit(route("shortenerUrl.index"), { preserveState: false });
  };

  const onRemove = (id: string) => (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setRemove(id);
  };

  const onSetPage = (page: number) => {
    setPage(page);
  };

  const onNext = () => {
    setPage(page + 1);
  };

  const onPrevious = () => {
    setPage(page - 1);
  };

  const parserData = (item: { [key: string]: any }) => {
    const { id, code, title, original_url } = item;
    return {
      id,
      code,
      title,
      original_url: original_url,
      actions: (
        <>
          <IconButton
            icon={<PencilSquareIcon className="size-4" />}
            aria-label="Edit a shortener url"
            className="text-blue-700 hover:text-white border-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            onClick={(event) => {
              event.stopPropagation();
              router.visit(route("shortenerUrl.show", id));
            }}
          />
          <IconButton
            icon={<TrashIcon className="size-4" />}
            aria-label="Remove a shortened url"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={onRemove(id)}
          />
        </>
      ),
    };
  };

  const visibleRows = useMemo(
    () => rows.map(parserData),
    [rows, page, perPage]
  );

  return (
    <AuthenticatedLayout
      user={auth.user}
      breadcrumbs={[
        {
          href: route("shortenerUrl.index"),
          label: "List shortener urls",
        },
      ]}
      header={
        <>
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Shortened URLs
          </h2>
          <IconButton
            href={route("shortenerUrl.create")}
            icon={<PlusIcon className="size-4" />}
            aria-label="Create new a shortened url"
            className="text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          />
        </>
      }
    >
      <Head title="List - Shortener Url" />
      <Table
        columns={columns}
        rows={visibleRows}
        page={page}
        perPage={perPage}
        total={total}
        hasMorePages={hasMorePages}
        setPage={onSetPage}
        onNext={onNext}
        onPrevious={onPrevious}
        onClickItem={(row) => {
          console.log(route("api.shortenerUrl.link", row.code))
          window.open(route("api.shortenerUrl.link", row.code))
        }}
      />
      <ModalConfirm
        open={Boolean(remove)}
        onClose={() => setRemove(null)}
        onConfirm={handleRemove}
      />
    </AuthenticatedLayout>
  );
}
