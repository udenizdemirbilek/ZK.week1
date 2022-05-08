// const { expect } = require("chai");
// const { ethers } = require("hardhat");
// const fs = require("fs");
// const { groth16, plonk } = require("snarkjs");

// function unstringifyBigInts(o) {
//   if (typeof o == "string" && /^[0-9]+$/.test(o)) {
//     return BigInt(o);
//   } else if (typeof o == "string" && /^0x[0-9a-fA-F]+$/.test(o)) {
//     return BigInt(o);
//   } else if (Array.isArray(o)) {
//     return o.map(unstringifyBigInts);
//   } else if (typeof o == "object") {
//     if (o === null) return null;
//     const res = {};
//     const keys = Object.keys(o);
//     keys.forEach((k) => {
//       res[k] = unstringifyBigInts(o[k]);
//     });
//     return res;
//   } else {
//     return o;
//   }
// }

// describe("LessThan10", function () {
//   let Verifier;
//   let verifier;

//   beforeEach(async function () {
//     Verifier = await ethers.getContractFactory("LessThan10Verifier");
//     verifier = await Verifier.deploy();
//     await verifier.deployed();
//   });

//   it("Should return true for correct proof", async function () {
//     //[assignment] Add comments to explain what each line is doing
//     // defines input, the circuit to test and the final key to create a proof, for the test case
//     const { proof, publicSignals } = await groth16.fullProve(
//       { in: 9 },
//       "contracts/circuits/LessThan10/LessThan10_js/LessThan10.wasm",
//       "contracts/circuits/LessThan10/circuit_final.zkey"
//     );
//     console.log(publicSignals[1], "< 10");

//     // converts each string of publicSignals to bigInts
//     const editedPublicSignals = unstringifyBigInts(publicSignals);
//     // converts each value of the proof which is a string to bigInts
//     const editedProof = unstringifyBigInts(proof);
//     // creates a string from the editedProof and editedPublicSignals which can be called later as a result of a promise
//     const calldata = await groth16.exportSolidityCallData(
//       editedProof,
//       editedPublicSignals
//     );

//     // erase any whitespace, split the remainder into an array of words by commas, and convert each BigInt to a string
//     const argv = calldata
//       .replace(/["[\]\s]/g, "")
//       .split(",")
//       .map((x) => BigInt(x).toString());
//     console.log(argv);
//     // create an array from the first two elements of argv
//     const a = [argv[0], argv[1]];
//     // create two arrays nested in an array from the third, fourth and fifth,sixth element of argv
//     const b = [
//       [argv[2], argv[3]],
//       [argv[4], argv[5]],
//     ];
//     // create an array from argv[6] and argv[7]
//     const c = [argv[6], argv[7]];
//     //  returns an array starting with the argv[8] and ending with the last element of argv
//     const Input = argv.slice(8);
//     console.log(Input);
//     // calls the verifier contract with the edited proof, edited public signals, (a, b and c) to check if it's true
//     expect(await verifier.verifyProof(a, b, c, Input)).to.be.true;
//   });
//   it("Should return false for invalid proof", async function () {
//     let a = [0, 0];
//     let b = [
//       [0, 0],
//       [0, 0],
//     ];
//     let c = [0, 0];
//     let d = [0, 0];
//     expect(await verifier.verifyProof(a, b, c, d)).to.be.false;
//   });
// });
