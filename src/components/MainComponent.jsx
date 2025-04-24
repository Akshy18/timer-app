import { useState, useEffect } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CardComponent from "./CardComponent";
import Form from "./Form";

const MainComponent = () => {
  const defaultData = {
    workout: [
      { id: "workout-1", name: "Pushups", seconds: 15 },
      { id: "workout-2", name: "Squats", seconds: 20 },
      { id: "workout-3", name: "Lunges", seconds: 25 },
    ],
    study: [
      { id: "study-1", name: "Math", seconds: 30 },
      { id: "study-2", name: "Science", seconds: 45 },
    ],
    break: [{ id: "break-1", name: "Coffee Break", seconds: 10 }],
  };

  const defaultCategory = [
    ["workout", "NoAction"],
    ["study", "NoAction"],
    ["break", "NoAction"],
  ];

  const [isOpen, setIsOpen] = useState(() => {
    const savedIsOpen = localStorage.getItem("isOpen");
    return savedIsOpen
      ? JSON.parse(savedIsOpen)
      : {
          workout: false,
          study: false,
          break: false,
        };
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [category, setCategory] = useState(() => {
    const savedCategory = localStorage.getItem("category");
    return savedCategory ? JSON.parse(savedCategory) : defaultCategory;
  });

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("timerData");
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem("timerData", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(category));
  }, [category]);

  useEffect(() => {
    localStorage.setItem("isOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  const toggleSection = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubmit = (formData) => {
    const { number, name } = formData;
    const uniqueId = `${formData.category}-${Date.now()}`;

    const newData = {
      ...data,
      [formData.category]: [
        ...(data[formData.category] || []),
        { id: uniqueId, name: name, seconds: parseInt(number) },
      ],
    };
    setData(newData);
    const isThere = category.find((item) => item[0] === formData.category);
    if (!isThere) {
      setCategory((prev) => [...prev, [formData.category, "NoAction"]]);
    }
    setIsOpen((prev) => ({
      ...prev,
      [formData.category]: true,
    }));
    setIsOpenModal(false);
  };

  const handleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleDelete = (category, id) => {
    const newData = {
      ...data,
      [category]: data[category].filter((item) => item.id !== id),
    };
    setData(newData);
  };

  const handleCategory = (value, currCategory) => {
    const newCategory = category.map((item) => {
      if (item[0] === currCategory) {
        return [item[0], value];
      }
      return item;
    });
    setCategory(newCategory);
    if (currCategory != "NoAction") {
      setIsOpen((prev) => ({
        ...prev,
        [currCategory]: true,
      }));
    }
  };

  const handleDeleteCategory = (currCategory) => {
    const newCategory = category.filter((item) => item[0] !== currCategory);
    setCategory(newCategory);
    const newData = { ...data };
    delete newData[currCategory];
    setData(newData);
    const newIsOpen = { ...isOpen };
    delete newIsOpen[currCategory];
    setIsOpen(newIsOpen);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full flex py-8">
        <button
          onClick={handleModal}
          className="mx-auto px-10 py-4 border border-transparent rounded-md shadow-sm text-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </div>
      {isOpenModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center z-50">
          <Form
            onSubmit={handleSubmit}
            options={category}
            handleModal={handleModal}
          />
        </div>
      )}
      {category.map((item, index) => {
        return (
          <div key={index} className="w-[90%] mx-auto my-3">
            <div className={`w-full h-[15vh] border-b-4 border-indigo-600 shadow-b-2xl rounded-xl flex ${ window.innerWidth <= 640 && 'flex-col'} items-center justify-between px-4`}>
              <div className="sm:text-xl md:text-2xl text-lg font-bold">
                {" "}
                {item[0].charAt(0).toUpperCase() + item[0].slice(1)}
              </div>
            
              <div className={`${ window.innerWidth <= 640 && 'w-full'} flex items-center justify-between space-x-3 pb-4`}>
                <select
                  className="w-[9rem] px-2 py-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 cursor-pointer pr-10"
                  id="Action"
                  name="Action"
                  value={item[1]}
                  onChange={(e) => handleCategory(e.target.value, item[0])}
                >
                  <option value="NoAction">NoAction</option>
                  <option value="StartAll">StartAll</option>
                  <option value="PauseAll">PauseAll</option>
                  <option value="ResetAll">ResetAll</option>
                </select>
                <div className="flex items-center">
                <button
                  onClick={() => handleDeleteCategory(item[0])}
                  className="md:px-3 md:py-2 py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  delete
                </button>
                <button
                  onClick={() => toggleSection(item[0])}
                  className="transition-transform duration-300 transform"
                >
                  {isOpen[item[0]] ? (
                    <IoIosArrowUp size={40} color="indigo" />
                  ) : (
                    <IoIosArrowDown size={40} color="indigo" />
                  )}
                </button>
                </div>
              </div>
            </div>
            <div
              className={`overflow-auto flex flex-col transition-all duration-300 ease-in-out ${
                isOpen[item[0]]
                  ? "max-h-[50vh] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              {data[item[0]]?.map((card, index) => (
                <div
                  key={card.id}
                  className="flex flex-col items-center justify-center"
                >
                  <CardComponent
                    id={card.id}
                    name={card.name}
                    seconds={card.seconds}
                    handleDelete={handleDelete}
                    category={item}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainComponent;
