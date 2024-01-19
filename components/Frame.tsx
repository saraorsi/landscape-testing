type FrameProps = {
  input: string;
  landscape: string;
};

const Frame: React.FC<FrameProps> = ({ input, landscape }) => {
  return (
    <div>
      <div className="background">
        <img src={landscape} />
      </div>
      <div className="fixed bottom-10 text-center px-64 text-xl">{input}</div>
    </div>
  );
};

export default Frame;
