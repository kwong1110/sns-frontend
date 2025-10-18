# SNS Feed

## 실행 방법

Node.js 20+, pnpm 사용을 권장합니다.

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 프로덕션 서버 실행
pnpm start
```

## 사용 기술 스택

| 기술                             | 사용 이유                                                |
| -------------------------------- | -------------------------------------------------------- |
| **Next.js 15 (App Router)**      | 최신 SSR/CSR 혼합 기능, 파일 기반 라우팅, 이미지 최적화  |
| **TypeScript**                   | 정적 타입 체크, 안정적인 코드 관리                       |
| **React 18**                     | 컴포넌트 기반 구조, 선언적 코드 작성 및 다양한 Hook 활용 |
| **Tailwind CSS v4**              | 유틸리티 기반 스타일링으로 빠른 UI 개발                  |
| **shadcn/ui**                    | Radix UI 기반 컴포넌트, 접근성 및 디자인 통일성          |
| **React Query (TanStack Query)** | 서버 상태 관리, 데이터 fetching, 캐싱                    |
| **Zod + react-hook-form**        | 폼 검증, 타입 안전성 보장                                |
| **pnpm**                         | 빠른 패키지 설치 및 디스크 공간 절약                     |

## 디렉토리 구조

[FSD(Feature-Sliced Design) 2.1](https://feature-sliced.design/kr/docs/get-started/overview) 기준으로 설계하여 유지보수성과 재사용성을 고려했습니다.

- features: 페이지 단위 기능을 캡슐화, 상태와 로직 포함 가능
- widgets: 여러 페이지에서 재사용 가능한 UI 단위
- entities: 도메인 객체와 타입 정의
- shared: 공통 컴포넌트 및 유틸

```
src/
├── app/
│   ├── globals.css            # 공통 스타일
│   ├── not-found.tsx          # 404 페이지
│   ├── layout.tsx             # 공통 레이아웃
│   └── page.tsx               # 홈 페이지 (피드 목록)
├── features/                  # 특정 비즈니스 로직 단위 기능
│   └── create-post/
│       └── ui/                # 게시물 작성 UI
├── entities/                  # mock data, 도메인 엔티티, 타입 정의
│   ├── user/
│   └── post/
├── shared/
│   ├── components/            # 공통 UI
│   │   └── ui/                # 버튼, 입력 등 최소 단위 재사용 UI
│   └── lib/                   # util (라이브러리 관련 유틸 포함)
├── widgets/                   # 여러 곳에서 재사용 가능한 UI 단위
│   ├── post-list/
│   └── sidebar.tsx
```

## 핵심 기능

- [x] 반응형 UI

- 게시물 리스트(/)

  - [x] 무한 스크롤로 게시물 목록 표시

- 게시물 카드에 포함될 정보

  - [x] 작성자 정보(프로필 이미지, 닉네임)
  - [x] 게시물 내용(텍스트, 이미지, 카테고리)
  - [x] 작성시간(상대적 시간: “방금 전”, “1시간 전”)
  - [x] 상호작용 관련 내용(좋아요 수, 리트윗수, 댓글 수)
  - [ ] 상호작용 버튼(좋아요, 리트윗)

- 게시물 작성(/create)

  - [x] 게시물 작성 모달 또는 별도 페이지 -> 모달 구현
  - [x] 텍스트 입력(최대 280자)
  - [x] 실시간 글자 수 카운터
  - [x] 이미지 첨부 기능 (미리보기 포함, 최대 4장)
  - [x] 카테고리 선택(1개만)
  - [x] 작성 완료 후 피드에 새 게시물 반영

---

- UX 개선

  - [x] 스켈레톤 로딩 적용
  - [x] 풀 투 리프레시 (모바일)
  - [x] 이미지 확대보기 모달
  - [ ] 댓글 표시와 입력 UI
  - [x] 텍스트 하이라이팅(해시태그, URL)

- 기능 개선
  - [x] 카테고리 필터링 기능 추가
  - [x] 등록시간별 정렬 기능 추가
  - [x] 이미지 lazy loading
