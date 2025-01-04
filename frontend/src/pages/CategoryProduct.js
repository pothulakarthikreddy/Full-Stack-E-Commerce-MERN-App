import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import productCategory from '../helpers/productCategory';
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListInArray = urlSearch.getAll("category");
  const urlCategoryListObject = {};

  urlCategoryListInArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState({ urlCategoryListObject });
  const [filterCategoryList, setFilterCategoryList] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false); // Toggle filter menu

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });
    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
    console.log(dataResponse);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => (selectCategory[categoryKeyName] ? categoryKeyName : null))
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);

    const urlFormat = arrayOfCategory.map((el, index) =>
      arrayOfCategory.length - 1 === index ? `category=${el}` : `category=${el}&&`
    );

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);

    if (value === 'asc') {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === 'dsc') {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Menu button for filters (mobile view) */}
      <button
        className="lg:hidden bg-gray-600 text-white px-4 py-2 rounded-full mb-4"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[200px,1fr] gap-4">
        {/* Left Side - Filters */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } lg:block bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-auto lg:sticky lg:top-16`}
        >
          {/* Sort by */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Sort by
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'asc'}
                  value="asc"
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - Low to High</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'dsc'}
                  value="dsc"
                  onChange={handleOnChangeSortBy}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/* Filter by Category */}
          <div>
            <h3 className="text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300">
              Filter by Category
            </h3>
            <form className="text-sm flex flex-col gap-2 py-2">
              {productCategory.map((category, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategory[category?.value]}
                    value={category?.value}
                    id={category?.value}
                    onChange={handleSelectCategory}
                  />
                  <label htmlFor={category?.value}>{category?.label}</label>
                </div>
              ))}
            </form>
          </div>
        </div>

        {/* Right Side - Products */}
        <div className="px-4">
          <p className="font-medium text-slate-800 text-lg my-2">Search Result: {data.length}</p>
          <div className="min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-auto">
            {data.length !== 0 ? (
              <VerticalCard data={data} loading={loading} />
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;
