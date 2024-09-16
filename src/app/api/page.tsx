// "use server"

export default async function Page({
    params,
    searchParams,
  }: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }) {
    return <h1>My Page</h1>
  }