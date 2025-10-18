import Link from "next/link";

export default function ActivityPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center">
      <h1 className="text-3xl font-bold text-foreground">
        서비스 준비중입니다.
      </h1>

      <Link
        href="/"
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
