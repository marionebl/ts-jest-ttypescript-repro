const ts = require("typescript");

exports.getTransformer = () => {
  console.log('transforming!');

  function getVisitor(ctx, sf) {
    const visitor = node => {
      if (ts.isVariableDeclaration(node)) {
        if (node.name.getText() === "greeting") {
          return ts.createVariableDeclaration(
            "greeting",
            undefined,
            ts.createLiteral("Hello, World!")
          );
        }
      }

      return ts.visitEachChild(node, visitor, ctx);
    };
    return visitor;
  }
  return ctx => sf => ts.visitNode(sf, getVisitor(ctx, sf));
};

exports.default = exports.getTransformer;
