"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = apply;

function apply(issue, jiraClientAPI) {
  return Promise.reject(new Error("Cannot commit against " + issue.key + ". It is an epic."));
}