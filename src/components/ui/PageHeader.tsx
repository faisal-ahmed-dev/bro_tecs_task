interface PageHeaderProps {
    title: string;
  }

  export const PageHeader = ({ title }: PageHeaderProps) => {
    return (
      <h1 className="text-2xl font-bold transition-none">{title}</h1>
    );
  };