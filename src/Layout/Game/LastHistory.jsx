import React from "react";

function LastHistory({ data }) {
  return (
    <div className="container">
      <table className="my_table">
        <tr>
          <th>Entered Number</th>
          <th>P</th>
          <th>M</th>
          <th>Tries</th>
        </tr>
        {data?.map((item) => (
          <tr>
            <td>{item?.clientNum}</td>
            <td>{item?.p}</td>
            <td>{item?.m}</td>
            <td>{item?.tryNumber}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default LastHistory;
