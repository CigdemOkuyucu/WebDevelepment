using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using FrontEnd_BackEnd.Models;

namespace frontend.Controllers;


public class HomeController : Controller
{
    public HomeController()
    {

    }

    //This is our controller for the homepage which ansder the get request from 
    //the home page. And it returns the corresponding view.

    [HttpGet("/")]
    public IActionResult Home()
    {
        return View();
        //return View("Views/Home/Foo.cshtml") to specify the path
        //when you add an endpoint which retuns a call to View()
        //then ASP.NET checks if you have a folder named "Views" and It will look inside the "Home" folder
        //since the name of the controller is "HomeController" and it will try to find the html file with the same name "Home.cshtml"
        //of the method that we have invoked. If this fails it will check the Shared folder. If all fails it will raise an exception
        //In this case it will check Views/Home/Home.cshtml
        //If it can not find here then it will try to find the home.cshtml file under Shared.
    }

}


/*
Under Views/Shared/layout.cshtml
A super template which is hsared across all the views. 
*/
