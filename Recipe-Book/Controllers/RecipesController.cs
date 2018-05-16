using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Recipe_Book.Models;

namespace Recipe_Book.Controllers
{
    public class RecipesController : Controller
    {
        // GET: Recipe
        public ActionResult Index()
        {
            return View(new Recipe { });
        }

        public ActionResult Ingredients(string Recipe)
        {
            //string message = HttpUtility.HtmlEncode("Recipe.Ingredients, Recipe = " + name);
            var recipeName = new Recipe { Name = Recipe };
            //return message;
            return View(recipeName);
        }
    }
}