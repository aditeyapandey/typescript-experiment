
import d3 = require("d3");

export class Barchart {
  width: number;
  height: number;
  containerElement: string;

  constructor(w: number, h: number, container: string) {
    this.width = w;
    this.height = h;
    this.containerElement = container;
  }

  createChart() {
    const svg = d3
      .select("."+this.containerElement)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(40,0)"); // bit of margin on the left = 40

    d3.json(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_dendrogram.json"
    ).then((data: any) => {
      // Create the cluster layout:
      const cluster = d3.cluster().size([this.height, this.width - 100]); // 100 is the margin I will have on the right side

      // Give the data to this cluster layout:
      const root = d3.hierarchy(data, function (d: any) {
        return d.children;
      });
      cluster(root);

      // Add the links between nodes:
      svg
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
        .attr("d", function (d: any) {
          return (
            "M" +
            d.y +
            "," +
            d.x +
            "C" +
            (d.parent.y + 50) +
            "," +
            d.x +
            " " +
            (d.parent.y + 150) +
            "," +
            d.parent.x + // 50 and 150 are coordinates of inflexion, play with it to change links shape
            " " +
            d.parent.y +
            "," +
            d.parent.x
          );
        })
        .style("fill", "none")
        .attr("stroke", "#ccc");

      // Add a circle for each node.
      svg
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", function (d: any) {
          return `translate(${d.y},${d.x})`;
        })
        .append("circle")
        .attr("r", 7)
        .style("fill", "blue")
        .attr("stroke", "black")
        .style("stroke-width", 2);
    });
  }
}

