import { Link } from "react-router-dom";

const allPages = [
  {
    title: "Dealer",
    links: [
      "http://localhost:5173/customer/dealer/approved",
      "http://localhost:5173/customer/dealer/non-approved",
      "http://localhost:5173/customer/dealer/add",
    ],
  },
];

const AllLinks = () => {
  return (
    <div className="flex-1">
      {allPages.map((item, idx) => (
        <div
          className="flex justify-start items-start w-full flex-col gap-y-1 p-4"
          key={idx}
        >
          <h4 className="mb-2 font-semibold text-lg">{item.title}</h4>
          {item.links.map((link, idx) => (
            <Link className="underline text-blue-500" to={link} key={idx}>
              {link}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AllLinks;
