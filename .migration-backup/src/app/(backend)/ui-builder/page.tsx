import { CustomBuilderWithPages } from "./components/custom-builder-with-pages";

export const metadata = {
  title: "UI Builder",
};

export default function Page() {
  return (
    <main className="flex flex-col h-dvh">
      <CustomBuilderWithPages />
    </main>
  );
}