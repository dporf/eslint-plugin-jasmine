'use strict'

/**
 * @fileoverview Enforce expect having a corresponding matcher.
 */

function create (context) {
  return {
    CallExpression: function (node) {
      if (node.callee.name === 'expect') {
        // matcher was not called

        let next = node.parent
        while (next?.type === 'MemberExpression') {
          const propName = next.property.name
          next = next.parent
          if (propName === 'withContext' && next?.type === 'CallExpression') next = next.parent
        }

        if (!next || next.type !== 'CallExpression') {
          context.report({
            message: 'Expect must have a corresponding matcher call.',
            node
          })
        }
      }
    }
  }
}

module.exports = {
  create
}
