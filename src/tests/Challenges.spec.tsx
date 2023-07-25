import * as React from 'react';
import '@testing-library/jest-dom'
import {render, fireEvent, screen} from '@testing-library/react'
import {rest} from 'msw'
import { setupServer } from 'msw/node'
import categories  from '../pages/_app' //Component or function to test
import filterbycategory from "../pages/_app"


//example test
describe('true is truthy and false is falsy', () => {
  it('true is truthy', () => {
    expect(true).toBe(true);
  });

  it('false is falsy', () => {
    expect(false).toBe(false);
  });
});

//test filtered categories 
// describe('should filter categories', ()=> {
  
//   expect(filterbycategory).toBe(true)
// })
