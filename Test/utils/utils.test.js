const expect = require("expect");
const utils = require("./utils");

it("should add two numbers", () => {
  var res = utils.add(33, 11);

  expect(res).toBe(44);
  // if (res != 44) {
  //   throw new Error(`Expected 44, but got ${res}`);
  // }
});

it("should square two numbers", () => {
  var res = utils.square(4);

  expect(res).toBe(16);
  // if (res != 16) {
  //   throw new Error(`Expected 16, but got ${res}`);
  // }
});

it("should set firtName and lastName", () => {
  let user = { location: "Hue", age: 22 };
  var res = utils.setName(user, "Hoang Long");
  // expect(res).toBe({
  //   firtName: "Hoang",
  //   lastName: "Long"
  // });
});

it("should set async Add",(done)=>{
  utils.asyncAdd(3,4,(sum)=>{
    expect(sum).toBe(7);
    done();
  });
})
