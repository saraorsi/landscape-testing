type InicialFrameProps = {
  input: string;
};

const InicialFrame: React.FC<InicialFrameProps> = ({ input }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-slate-900 flex items-center justify-center text-lg text-center px-10">
      {input}
    </div>
  );
};

export default InicialFrame;
