import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";

let id = 0;
function createData(name, stock, allocated, order) {
  id += 1;
  return { id, name, stock, allocated, order };
}

/* const data = [
  createData("Dell 2GR91 Slim USB Keboard ", 50, 20, 15),
  createData("HP SB USB Wired Optical Scroll Mouse", 50, 20, 8),
  createData("Microsoft Surface Dock", 10, 3, 4),
  createData("Segate 1TB EHD", 8, 0, 10),
  createData("HP EliteDisplay S340c 34in", 3, 1, 5),
]; */

export default class SimpleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      asset_data: [],
    };
  }

  async componentDidMount() {
    let data = await Axios.get("/api/home_page/getTableData");
    let array = [];
    data.data.forEach((document) => {
      array.push({
        id: document._id,
        name: document.item,
        stock: document.stock,
      });
    });
    this.setState(() => {
      return {
        asset_data: array,
      };
    });
  }

  render() {
    return (
      <Paper /* className={classes.root} */>
        <Table /* className={classes.table} */>
          <TableHead>
            <TableRow>
              <TableCell>Items</TableCell>
              <TableCell align="right">Stock</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.asset_data.map((data) => (
              <TableRow key={data.id}>
                <TableCell component="th" scope="row">
                  {data.name}
                </TableCell>
                <TableCell align="right">{data.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}
