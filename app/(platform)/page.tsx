interface AppPageProps {
  params: {};
}

const AppPage = async ({ params }: AppPageProps) => {
  return (
    <div className="max-w-lg mx-auto h-full">
      <div className="flex justify-between p-10 flex-col bg-white rounded-lg w-full h-full">
        <div className="flex flex-col gap-4">
          <div className="text-gray-700">
            Once upon a time in a small town nestled between rolling hills and
            meandering streams, there lived a curious young girl named Lily.
            Lily was known for her bright blue eyes, a contagious smile, and an
            insatiable desire for adventure. One sunny morning, she woke up with
            a mysterious map at the foot of her bed.
          </div>

          <p className="font-bold">What's the name of the main actor?</p>

          <div className="flex flex-col gap-2">
            <label>
              <input type="radio" name="radio-group" className="mr-2" />
              Option 1
            </label>
            <label>
              <input type="radio" name="radio-group" className="mr-2" />
              Option 2
            </label>
            <label>
              <input type="radio" name="radio-group" className="mr-2" />
              Option 3
            </label>
          </div>
        </div>

        <div className="">buttons</div>
      </div>
    </div>
  );
};

export default AppPage;
