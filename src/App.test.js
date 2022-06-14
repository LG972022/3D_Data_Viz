import App from "./App";
import { createBreakdownOfMetorData } from "./Components/MeteorData";
import { createBreakdownOfNYTData } from "./Components/NYTData";

describe("createBreakdownOfNYTData -- Function Tests", () => {
  test("check the function returns object with correct keys", () => {
    const testData = [
      { name: "book 1", title: "The cat in the hat" },
      { name: "book 2", title: "Green eggs and ham" },
      { name: "book 3", title: "Horton hears a who!" },
      { name: "book 4", title: "Oh the places you'll go" },
    ];
    const processedTestData = createBreakdownOfNYTData(testData);

    expect(processedTestData.hasOwnProperty("countTitleOneWord")).toBe(true);
    expect(processedTestData.hasOwnProperty("countTitleOverThreeWord")).toBe(
      true
    );
    expect(processedTestData.hasOwnProperty("countTitleTwotoThreeWord")).toBe(
      true
    );
    expect(processedTestData.hasOwnProperty("percentageTitleOneWord")).toBe(
      true
    );
    expect(
      processedTestData.hasOwnProperty("percentageTitleOverThreeWord")
    ).toBe(true);
    expect(
      processedTestData.hasOwnProperty("percentageTitleTwotoThreeWord")
    ).toBe(true);
    expect(processedTestData.hasOwnProperty("segmentArray")).toBe(true);
    expect(processedTestData.hasOwnProperty("totalTitleCount")).toBe(true);
  });

  test("check the function returns object with values of the correct data types", () => {
    const testData = [
      { name: "book 1", title: "The cat in the hat" },
      { name: "book 2", title: "Green eggs and ham" },
      { name: "book 3", title: "Horton hears a who!" },
      { name: "book 4", title: "Oh the places you'll go" },
    ];
    const processedTestData = createBreakdownOfNYTData(testData);

    expect(typeof processedTestData.countTitleOneWord).toBe("number");
    expect(typeof processedTestData.countTitleOverThreeWord).toBe("number");
    expect(typeof processedTestData.countTitleTwotoThreeWord).toBe("number");
    expect(typeof processedTestData.percentageTitleOneWord).toBe("number");
    expect(typeof processedTestData.percentageTitleOverThreeWord).toBe(
      "number"
    );
    expect(typeof processedTestData.percentageTitleTwotoThreeWord).toBe(
      "number"
    );
    expect(typeof processedTestData.segmentArray).toBe("object");
    expect(Array.isArray(processedTestData.segmentArray)).toBe(true);
    expect(typeof processedTestData.totalTitleCount).toBe("number");
  });

  test("check the function returns object with correct values for provided dataset", () => {
    const testData1 = [
      { name: "book 1", title: "The cat in the hat" },
      { name: "book 2", title: "Green eggs and ham" },
      { name: "book 3", title: "Horton hears a who!" },
      { name: "book 4", title: "Oh the places you'll go" },
    ];
    const processedTestData1 = createBreakdownOfNYTData(testData1);

    expect(processedTestData1.countTitleOneWord).toBe(0);
    expect(processedTestData1.countTitleOverThreeWord).toBe(4);
    expect(processedTestData1.countTitleTwotoThreeWord).toBe(0);
    expect(processedTestData1.percentageTitleOneWord).toBe(0);
    expect(processedTestData1.percentageTitleOverThreeWord).toBe(100);
    expect(processedTestData1.percentageTitleTwotoThreeWord).toBe(0);
    expect(processedTestData1.segmentArray).toEqual([
      {
        percentageNum: 0,
        segmentColour: "#43C41D",
        segmentLabel: "One Word",
      },
      {
        percentageNum: 0,
        segmentColour: "#EE850F",
        segmentLabel: "Two - Three Words",
      },
      {
        percentageNum: 100,
        segmentColour: "#0FBEEE",
        segmentLabel: "Four or more Words",
      },
    ]);
    expect(processedTestData1.totalTitleCount).toBe(4);

    const testData2 = [
      { name: "book 1", title: "The Disaster Artist" },
      { name: "book 2", title: "Jacked" },
      { name: "book 3", title: "Harry Potter And the Thing of the Thing" },
      { name: "book 4", title: "1984" },
    ];
    const processedTestData2 = createBreakdownOfNYTData(testData2);

    expect(processedTestData2.countTitleOneWord).toBe(2);
    expect(processedTestData2.countTitleOverThreeWord).toBe(1);
    expect(processedTestData2.countTitleTwotoThreeWord).toBe(1);
    expect(processedTestData2.percentageTitleOneWord).toBe(50);
    expect(processedTestData2.percentageTitleOverThreeWord).toBe(25);
    expect(processedTestData2.percentageTitleTwotoThreeWord).toBe(25);
    expect(processedTestData2.segmentArray).toEqual([
      {
        percentageNum: 50,
        segmentColour: "#43C41D",
        segmentLabel: "One Word",
      },
      {
        percentageNum: 25,
        segmentColour: "#EE850F",
        segmentLabel: "Two - Three Words",
      },
      {
        percentageNum: 25,
        segmentColour: "#0FBEEE",
        segmentLabel: "Four or more Words",
      },
    ]);
    expect(processedTestData2.totalTitleCount).toBe(4);

    const testData3 = [
      { name: "book 1", title: "James and the Giant Peach" },
      { name: "book 2", title: "Charlie and the Chocolate Factory" },
      { name: "book 3", title: "Matilda" },
    ];
    const processedTestData3 = createBreakdownOfNYTData(testData3);

    expect(processedTestData3.countTitleOneWord).toBe(1);
    expect(processedTestData3.countTitleOverThreeWord).toBe(2);
    expect(processedTestData3.countTitleTwotoThreeWord).toBe(0);
    expect(processedTestData3.percentageTitleOneWord).toBe(33);
    expect(processedTestData3.percentageTitleOverThreeWord).toBe(67);
    expect(processedTestData3.percentageTitleTwotoThreeWord).toBe(0);
    expect(processedTestData3.segmentArray).toEqual([
      {
        percentageNum: 33,
        segmentColour: "#43C41D",
        segmentLabel: "One Word",
      },
      {
        percentageNum: 0,
        segmentColour: "#EE850F",
        segmentLabel: "Two - Three Words",
      },
      {
        percentageNum: 67,
        segmentColour: "#0FBEEE",
        segmentLabel: "Four or more Words",
      },
    ]);
    expect(processedTestData3.totalTitleCount).toBe(3);
  });

  test("check the segment array returned by function has correct keys and values of the correct data types", () => {
    const testData = [
      { name: "book 1", title: "The cat in the hat" },
      { name: "book 2", title: "Green eggs and ham" },
      { name: "book 3", title: "Horton hears a who!" },
      { name: "book 4", title: "Oh the places you'll go" },
    ];
    const processedTestData = createBreakdownOfNYTData(testData);

    expect(typeof processedTestData.segmentArray).toBe("object");
    expect(Array.isArray(processedTestData.segmentArray)).toBe(true);

    for (let i = 0; i < processedTestData.segmentArray.length; i++) {
      expect(
        processedTestData.segmentArray[i].hasOwnProperty("percentageNum")
      ).toBe(true);
      expect(typeof processedTestData.segmentArray[i].percentageNum).toBe(
        "number"
      );
      expect(
        processedTestData.segmentArray[i].hasOwnProperty("segmentColour")
      ).toBe(true);
      expect(typeof processedTestData.segmentArray[i].segmentColour).toBe(
        "string"
      );
      expect(
        processedTestData.segmentArray[i].hasOwnProperty("segmentLabel")
      ).toBe(true);
      expect(typeof processedTestData.segmentArray[i].segmentLabel).toBe(
        "string"
      );
    }
  });
});

describe("createBreakdownOfMetorData -- Function Tests", () => {
  test("check the function returns object with correct keys", () => {
    const testData = [
      { name: "meteor1", mass: 1001 },
      { name: "meteor2", mass: 900 },
      { name: "meteor3", mass: 400 },
      { name: "meteor4", mass: 2000 },
    ];
    const processedTestData = createBreakdownOfMetorData(testData);

    expect(processedTestData.hasOwnProperty("countOver1000g")).toBe(true);
    expect(processedTestData.hasOwnProperty("countUnder1000g")).toBe(true);
    expect(processedTestData.hasOwnProperty("totalMeteorCount")).toBe(true);
    expect(processedTestData.hasOwnProperty("percentageUnder1000g")).toBe(true);
    expect(processedTestData.hasOwnProperty("percentageOver1000g")).toBe(true);
    expect(processedTestData.hasOwnProperty("anythingElse")).toBe(false);
  });

  test("check the function returns object with values of the correct data types", () => {
    const testData = [
      { name: "meteor1", mass: 1001 },
      { name: "meteor2", mass: 900 },
      { name: "meteor3", mass: 400 },
      { name: "meteor4", mass: 2000 },
    ];
    const processedTestData = createBreakdownOfMetorData(testData);

    expect(typeof processedTestData.countOver1000g).toBe("number");
    expect(typeof processedTestData.countUnder1000g).toBe("number");
    expect(typeof processedTestData.totalMeteorCount).toBe("number");
    expect(typeof processedTestData.percentageUnder1000g).toBe("number");
    expect(typeof processedTestData.percentageOver1000g).toBe("number");
  });

  test("check the function returns object with correct values for provided dataset", () => {
    const testData1 = [
      { name: "meteor1", mass: 1001 },
      { name: "meteor2", mass: 900 },
      { name: "meteor3", mass: 400 },
      { name: "meteor4", mass: 2000 },
    ];
    const processedTestData1 = createBreakdownOfMetorData(testData1);

    expect(processedTestData1.countOver1000g).toBe(2);
    expect(processedTestData1.countUnder1000g).toBe(2);
    expect(processedTestData1.totalMeteorCount).toBe(4);
    expect(processedTestData1.percentageUnder1000g).toBe(50);
    expect(processedTestData1.percentageOver1000g).toBe(50);
    expect(processedTestData1.segmentArray).toEqual([
      {
        percentageNum: 50,
        segmentColour: "#276CB2",
        segmentLabel: "Meteors under 1000g",
      },
      {
        percentageNum: 50,
        segmentColour: "#7098BF",
        segmentLabel: "Meteors over 1000g",
      },
    ]);

    const testData2 = [
      { name: "meteor1", mass: 1000 },
      { name: "meteor2", mass: 2000 },
      { name: "meteor3", mass: 3000 },
      { name: "meteor4", mass: 4000 },
    ];
    const processedTestData2 = createBreakdownOfMetorData(testData2);

    expect(processedTestData2.countOver1000g).toBe(4);
    expect(processedTestData2.countUnder1000g).toBe(0);
    expect(processedTestData2.totalMeteorCount).toBe(4);
    expect(processedTestData2.percentageUnder1000g).toBe(0);
    expect(processedTestData2.percentageOver1000g).toBe(100);
    expect(processedTestData2.segmentArray).toEqual([
      {
        percentageNum: 0,
        segmentColour: "#276CB2",
        segmentLabel: "Meteors under 1000g",
      },
      {
        percentageNum: 100,
        segmentColour: "#7098BF",
        segmentLabel: "Meteors over 1000g",
      },
    ]);

    const testData3 = [
      { name: "meteor1", mass: 10 },
      { name: "meteor2", mass: 2000 },
      { name: "meteor3", mass: 4000 },
      { name: "meteor4", mass: 2000 },
      { name: "meteor5", mass: 3500 },
    ];
    const processedTestData3 = createBreakdownOfMetorData(testData3);

    expect(processedTestData3.countOver1000g).toBe(4);
    expect(processedTestData3.countUnder1000g).toBe(1);
    expect(processedTestData3.totalMeteorCount).toBe(5);
    expect(processedTestData3.percentageUnder1000g).toBe(20);
    expect(processedTestData3.percentageOver1000g).toBe(80);
    expect(processedTestData3.segmentArray).toEqual([
      {
        percentageNum: 20,
        segmentColour: "#276CB2",
        segmentLabel: "Meteors under 1000g",
      },
      {
        percentageNum: 80,
        segmentColour: "#7098BF",
        segmentLabel: "Meteors over 1000g",
      },
    ]);
  });

  test("check the segment array returned by function has correct keys and values of the correct data types", () => {
    const testData = [
      { name: "meteor1", mass: 1001 },
      { name: "meteor2", mass: 900 },
      { name: "meteor3", mass: 400 },
      { name: "meteor4", mass: 2000 },
    ];
    const processedTestData = createBreakdownOfMetorData(testData);

    expect(typeof processedTestData.segmentArray).toBe("object");
    expect(Array.isArray(processedTestData.segmentArray)).toBe(true);

    for (let i = 0; i < processedTestData.segmentArray.length; i++) {
      expect(
        processedTestData.segmentArray[i].hasOwnProperty("percentageNum")
      ).toBe(true);
      expect(typeof processedTestData.segmentArray[i].percentageNum).toBe(
        "number"
      );
      expect(
        processedTestData.segmentArray[i].hasOwnProperty("segmentColour")
      ).toBe(true);
      expect(typeof processedTestData.segmentArray[i].segmentColour).toBe(
        "string"
      );
      expect(
        processedTestData.segmentArray[i].hasOwnProperty("segmentLabel")
      ).toBe(true);
      expect(typeof processedTestData.segmentArray[i].segmentLabel).toBe(
        "string"
      );
    }
  });
});
