package testing;
import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.*;
import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.interactions.internal.MouseAction.Button;
import org.openqa.selenium.support.ui.ExpectedCondition;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.util.Iterator;
class JunitTester {
	
	
	//This will run before every test
	@Before
	void init() {
		//System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		//WebDriver driver = new ChromeDriver();
		
		//driver.get("https://linedrivebetting-255803.appspot.com/");
	}
	
	

	/* Have a depth first search of all elements within the website
	 * With the search have the jUnit test fail instead of printing fail 
	 * in the console
	 */
	@ignore
	void testLogin() {
		
		
		//fail("Not yet implemented");
	}
	
	
	/*
	 * This test all links through a depth first search, I think it would be
	 * a for loop or a while loop, (look at 422C psuedocode...)
	 * TODO:
	 */
	@ignore
	void testAllLinksLinking() {
		//driver.findElement(By.linkText("Log-in")).click();
//		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
//		WebDriver driver = new ChromeDriver();
//		
//		driver.get("https://linedrivebetting-255803.appspot.com/");
//		List<WebElement> allLinks = driver.findElements(By.tagName("a"));
//		System.out.println("There are " + allLinks.size() + " links");
//		String linkName[] = new String[allLinks.size()];
//		int i = 0;
//				
//		for(WebElement c: allLinks) {
//			System.out.println(c.getText());
//			linkName[i] = c.getText();
//			System.out.println("Title: " + driver.getTitle());
//			
//			System.out.println(" " + c.getAttribute("href"));
//			i++;
//		}
//		for(String c: linkName) {
//			
//			System.out.print(c);
//			if(c.contains("about")) {
//				System.out.println("here!");
//				continue;
//			}
//			
//			driver.findElement(By.linkText(c)).click();
//			if(!driver.getTitle().equals("LineDriveBetting")){
//				System.out.println(c + "Link is broken");
//			}else {
//				System.out.println(c + "Link is working");
//			}
//			driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
//			driver.navigate().back();
//			driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
//			
//		}
//			
//		assertEquals(0,0);
		System.setProperty("webdriver.gecko.driver","lib/geckodriver");
		WebDriver driver = new FirefoxDriver();
		
		//driver.get("https://linedrivebetting-255803.appspot.com/");
		driver.get("http://localhost:3000/");
			//driver.findElement(By.linkText("Log-in")).click();
			List<WebElement> allLinks = driver.findElements(By.tagName("a"));
			System.out.println("There are " + allLinks.size() + " links");
			String linkName[] = new String[allLinks.size()];
			int i = 0;
					
			for(WebElement c: allLinks) {
				System.out.println(c.getText());
				linkName[i] = c.getText();
				System.out.println("Title: " + driver.getTitle());
				
				System.out.println(" " + c.getAttribute("href"));
				i++;
			}
			for(String c: linkName) {
				
				System.out.print(c);
				if(c.contains("about")) {
					System.out.println("here!");
					continue;
				}
				
				driver.findElement(By.linkText(c)).click();
				if(!driver.getTitle().equals("LineDriveBetting")){
					System.out.println(c + " link is broken");
					Assert.fail(c + " link is broken");
				}else {
					System.out.println(c + " link is working");
				}
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
				driver.navigate().back();
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);

				
			
			}
			
			driver.quit();
	}
		
		
	/*probably find a way to test all buttons by searching through all the pages
	 * for a button, try not to hard code this but simply navigate through all the 
	 * possible pages. If you don't want to repeat pages, just make a hashmap and check 
	 * if the page hasn't been checked yet.'
	 * Todo:	
	 */
	/*@ignore
	void testAllLinksCorrect() {
		System.setProperty("webdriver.chrome.driver","lib/chromedriver.exe");
		WebDriver driver = new ChromeDriver();
		
		//driver.get("https://linedrivebetting-255803.appspot.com/");
		driver.get("http://localhost:3000/");
			//driver.findElement(By.linkText("Log-in")).click();
			List<WebElement> allLinks = driver.findElements(By.tagName("a"));
			System.out.println("There are " + allLinks.size() + " links");
			String linkName[] = new String[allLinks.size()];
			int i = 0;
					
			for(WebElement c: allLinks) {
				System.out.println(c.getText());
				linkName[i] = c.getText();
				System.out.println("Title: " + driver.getTitle());
				
				System.out.println(" " + c.getAttribute("href"));
				i++;
			}
			for(String c: linkName) {
				
				System.out.print(c);
				if(c.contains("about")) {
					System.out.println("here!");
					continue;
				}
				
				driver.findElement(By.linkText(c)).click();
				if(!driver.getCurrentUrl().contains(c)){
					System.out.println(c + " link is incorrect");
					System.out.println(c);
					System.out.println(driver.getCurrentUrl());
					Assert.fail(c + " link is incorrect");
				}else {
					System.out.println(c + " link is correct");
				}
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
				driver.navigate().back();
				driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);

				
			
			}
			driver.quit();
	}*/
	@Ignore
	void testHomePage() {
		System.setProperty("webdriver.gecko.driver","lib/geckodriver");
		WebDriver driver = new FirefoxDriver();
		driver.get("http://localhost:3000/home");
		WebDriverWait wait = new WebDriverWait(driver,5);
				wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("card")));
				driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		//List <WebElement> gameCards = driver.findElements(By.className("card"));
		List <WebElement> gameCards = driver.findElements(By.tagName("div"));
		//ArrayList <ArrayList<WebElement>> subCards = new ArrayList <ArrayList <WebElement>>();
		List <WebElement> subCardElements = new ArrayList <WebElement>();
		System.out.println(gameCards.size());
		subCardElements = driver.findElements(By.className("card"));
		System.out.println(subCardElements.size());
		for(int i = 0; i < subCardElements.size(); i++) {
			subCardElements.get(i).click();
			driver.get("http://localhost:3000/home");
			subCardElements = driver.findElements(By.className("card"));
		}
//		for(WebElement c: subCardElements) {
//			
//			//subCardElement = c.findElements(By.tagName("div"));
//			System.out.println(c.getText() + " These are all the divs on homepage");
//			//subCardElement = driver.findElements(By.className("card")).click();
//			c.click();
//			count++;
//			System.out.println(count);
//			//System.out.println(c.getText());
//			//driver.findElement(By.linkText(c.getText())).click();;
//			driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
//			driver.get("http://localhost:3000/home");
//			driver.manage().timeouts().implicitlyWait(1, TimeUnit.SECONDS);
//			//driver.navigate().back();
//		}
	}
	@ignore
	void testAllButtons() {
		
	}
	
	
	//Miguel's implementation of a user case
	@Test
	void testUserCaseSignUp() {
		System.out.println("testUserCaseSignUpTest");
		
		/* initialization */
		System.setProperty("webdriver.gecko.driver","lib/geckodriver");
		WebDriver driver = new FirefoxDriver();
		driver.get("http://localhost:3000/home");
		
		
		
//		List<WebElement> allLinks = driver.findElements(By.tagName("a"));
//		System.out.println("There are " + allLinks.size() + " links");
//		String linkName[] = new String[allLinks.size()];
//		
//		int i = 0;
//				
//		for(WebElement c: allLinks) {
//			linkName[i] = c.getText();
//			String url = c.getAttribute("href");
//			System.out.println(linkName[i]);
//
//			System.out.println("Title: " + driver.getTitle());
//			
//			System.out.println("URl: " + url);
//			
//			i++;
//		}
		
		
		//After sign up
		driver.findElement(By.linkText("Log-in")).click();
		
		//Find the buttons
		List<WebElement> buttons = driver.findElements(By.tagName("button"));
		
		for(WebElement b : buttons) {
			if(b.getText().equals("Sign Up"));
			b.click();
		}
		
		
		//Inputs into text field miguel for all slots
		List<WebElement> createAccountInfo = driver.findElements(By.className("form-control"));
		
		for(WebElement text : createAccountInfo) {
			text.sendKeys("miguel");
		}
		
		
		//Creates the account
		List<WebElement> formButtons = driver.findElements(By.className("modal-footer"));
		
		for(WebElement b : formButtons) {
			if(b.getText().equals("Create Account"));
			b.click();
		}
		
		//Input account credentials
		List<WebElement> createAccountInfo1 = driver.findElements(By.className("form-control"));

		for(WebElement b : createAccountInfo1) {
			b.clear();
			b.sendKeys("miguel");
		}
		
		//Finally sign in 
		driver.findElement(By.linkText("Log In")).click();

		
		
		

		
	
		
		
	}
	
	//Miguel's Implementation of another user case
	@ignore 
	void testUserCase2(){
		
	}
	
	

}
