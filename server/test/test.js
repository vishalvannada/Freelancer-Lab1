var assert = require('assert');
var request = require('request');
var express = require('express');
var http = require("http");

describe('HTTP Tests', function() {

    it('Should not get the response, as the user is not logged in', function(done) {
        http.get('http://localhost:3000/', function(res) {
            assert.equal(401, res.statusCode);
            done();
        })
    });

    it('The Page does not exists, 404 Error', function(done) {
        http.get('http://localhost:3000/test', function(res) {
            assert.equal(404, res.statusCode);
            done();
        })
    });

    it('Should login', function(done) {
        request.post('http://localhost:3000/login', {
            form:{
                username : 'vinodkatta',
                password:'vishal'
            }
        }, function(error, response, body) {
            assert.equal(201, response.statusCode);
            done();
        });
    });

    it('Should not login', function(done) {
        request.post('http://localhost:3000/login', {
            form:{
                username : 'vinodkatta',
                password:'vishalvannada'
            }
        }, function(error, response, body) {
            assert.equal(401, response.statusCode);
            done();
        });
    });

    it('Should Sign Up', function(done) {
        request.post('http://localhost:3000/signup', {
            form:{
                username : 'rishi',
                email : 'rishi@gmail.com',
                password:'vishal',
                confirmPassword : 'vishal'
            }
        }, function(error, response, body) {
            assert.equal(201, response.statusCode);
            done();
        });
    });

    it('Should not Sign Up', function(done) {
        request.post('http://localhost:3000/signup', {
            form:{
                username : 'sreedevi',
                email : 'pranith@gmail.com',
                password:'vishal',
                confirmPassword : 'vishal'
            }
        }, function(error, response, body) {
            assert.equal(401, response.statusCode);
            done();
        });
    });
});