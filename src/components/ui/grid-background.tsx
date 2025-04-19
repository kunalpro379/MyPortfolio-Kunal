const GridBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0">
        <div className="grid-pattern absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  );
};

export default GridBackground;