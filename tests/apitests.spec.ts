import { expect, test } from '@playwright/test';
import * as selectors from '../data/selectors.json';
import { Request } from 'playwright-core';

test.describe('request validation', () => {
  let response;


  test('1. USERS - Should be a GET request method for listing users', async({request}) => {
    response = await request.get('https://gorest.co.in/public/v2/users');

    expect(response.status()).toBe(200);
  });

  test('2. USERS - The server property of the header should be "cloudflare"', async({request})  => {
    response = await request.get('https://gorest.co.in/public/v2/users');
    const responseHeader = response.headers();
    expect(responseHeader.server).toEqual('cloudflare');
  });

  test('3. USERS - The date property should be correct', async({request})  => {
    response = await request.get('https://gorest.co.in/public/v2/users');
    const responseHeader = response.headers();
  
    const currentDate = new Date().getTime();
    
    const responseDate = responseHeader.date;

    expect(Date.parse(responseDate)).toBeLessThan(currentDate);
  });

  test('4. USERS - The id property should be non-empty and numeric in the response body', async({request})  => {
    response = await request.get('https://gorest.co.in/public/v2/users');
    const responseBody = await response.json();
    
    responseBody.forEach(element => {
        expect(element.id).not.toBeNaN();
    });
  });

  test('5. USERS - The gender property should be male or female in the response body', async({request})  => {
    response = await request.get('https://gorest.co.in/public/v2/users');
    const responseBody = await response.json();
    
    responseBody.forEach(element => {
        expect(element.gender).toMatch(/male|female/);
    });
  });

  test('6. POSTS - The server property of the header should be "cloudflare"', async({request})  => {
    response = await request.get('https://gorest.co.in/public/v2/posts');
    const responseHeader = response.headers();
    expect(responseHeader.server).toEqual('cloudflare');
  });

  test('7. POSTS - The date property should be correct', async({request})  => {
    response = await request.get('https://gorest.co.in/public/v2/posts');
    const responseHeader = response.headers();
  
    const currentDate = new Date().getTime();
    
    const responseDate = responseHeader.date;

    expect(Date.parse(responseDate)).toBeLessThan(currentDate);
  });
  test('8. POSTS - The id property should be non-empty and numeric in the response body', async({request})  => {
    response = await request.get('https://gorest.co.in/public/v2/posts');
    const responseBody = await response.json();
    
    responseBody.forEach(element => {
        expect(element.id).not.toBeNaN();
    });
  });

  test('9. POSTS - The user_id property should be non-empty and numeric in the response body', async({request})  => {
    response = await request.get('https://gorest.co.in/public/v2/posts');
    const responseBody = await response.json();
    
    responseBody.forEach(element => {
        expect(element.user_id).not.toBeNaN();
    });
  });
  
  test('10. POSTS - The title property should be not empty in the response body', async({request})  => {
    response = await request.get('https://gorest.co.in/public/v2/posts');
    const responseBody = await response.json();
    
    responseBody.forEach(element => {
        expect(element.title).not.toBeEmpty;
    });
  });
});