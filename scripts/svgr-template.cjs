module.exports = function template(variables, { tpl }) {
  const { imports, interfaces, componentName, props, jsx, exports } = variables;

  return tpl`
${imports}
${interfaces}

const ${componentName} = (${props}) => ${jsx};

${exports}
`;
};