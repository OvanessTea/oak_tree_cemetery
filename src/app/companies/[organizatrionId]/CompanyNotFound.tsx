import { FC } from "react";

const CompanyNotFound: FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center h-full text-center py-20 px-4">
      <h2 className="text-2xl font-semibold mb-2">Компания не найдена</h2>
      <p className="text-gray-500 max-w-md">
        Похоже, компания с таким ID отсутствует или была удалена. Проверьте ссылку или попробуйте позже.
      </p>
    </div>
  );
};

export default CompanyNotFound;