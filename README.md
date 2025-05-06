# React + TypeScript + Vite

## Set up
- Start
```sh
npm create vite@latest shop-ui -- --template react-ts
npm install

npm install --save-dev @types/node
```

- Eslint

```sh
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```



- TailwindCss

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

```

- MUI

```sh
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

- js-cookie
```sh
npm install js-cookie
npm install --save-dev @types/js-cookie

```


src/
├── assets/             # Hình ảnh, fonts, icon, v.v.
├── components/         # Các component dùng lại được
│   └── Button/
│       ├── Button.tsx
│       └── index.ts
├── features/           # Theo mô hình feature-based (theo chức năng)
│   └── auth/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── authSlice.ts
├── layouts/            # Các layout (AuthLayout, MainLayout, ...)
├── pages/              # Các page chính (route gốc)
│   ├── Home.tsx
│   └── NotFound.tsx
├── router/             # Cấu hình React Router
│   └── index.tsx
├── services/           # Gọi API (Axios, fetch, ...)
├── store/              # Redux store, Zustand store hoặc context
│   └── index.ts
├── types/              # Định nghĩa các interface, type chung
├── utils/              # Các hàm tiện ích (formatDate, validateEmail, ...)
├── App.tsx
└── main.tsx# shop-ui
