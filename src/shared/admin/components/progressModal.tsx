export const ProgressModal = ({ progress }) => {
  return (
    <div className="mt-2">
      <div className="bg-gray-200 rounded-full">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-gray-600">
        {progress.toFixed(0)}% Uploading...
      </p>
    </div>
  );
};
