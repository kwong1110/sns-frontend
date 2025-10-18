import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center">
      <h1 className="text-5xl font-bold text-foreground">404</h1>
      <p className="mt-3 text-muted-foreground">페이지를 찾을 수 없습니다.</p>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
