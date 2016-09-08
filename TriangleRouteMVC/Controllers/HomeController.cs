using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TriangleRouteMVC.Controllers
{
    public class HomeController : Controller
    {
        [HttpPost]
        public JsonResult GetResult(string data)
        {
            int mapSize;
            string[] inputLines;

            double[][] map = Solver.getMap(data, out mapSize, out inputLines);

            double sum;
            string path;

            Solver.proc(map, mapSize, inputLines, out sum, out path);

            return Json(new { sum = sum, dir = path }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index()
        {
            return View();
        }

     
    }



    class Solver
    {
        
        static public double[][] getMap(string concatLines, out int mapSize, out string[] inputLines)
        {
            concatLines = concatLines.Trim(' ', '\n');
            inputLines = concatLines.Split('\n');

            mapSize = inputLines.Length;
            double[][] map = new double[mapSize][];

            for (int i = 0; i < mapSize; i++)
            {
                inputLines[i] = inputLines[i].Trim(' ', '\n');
                map[i] = new double[i + 2];
                map[i][0] = double.NegativeInfinity;
                string[] lineElem = inputLines[i].Split(' ');

                if (lineElem.Length != i + 1)
                    throw new Exception(String.Format("Line #{0} must contain {1} elements", i + 1, i + 1));

                for (int j = 1; j < i + 2; j++)
                    map[i][j] = double.Parse(lineElem[j - 1]);
            }
            return map;
        }


        static public void proc(double[][] map, int mapSize, string[] inputLines, out double sum, out string path)
        {
            // initialize accMap
            double[][] accMap = new double[mapSize][];

            for (int i = 0; i < mapSize; i++)
                accMap[i] = new double[i + 2];

            for (int j = 0; j <= mapSize; j++)
                accMap[mapSize - 1][j] = map[mapSize - 1][j];

            // ---

            for (int i = mapSize - 2; i >= 0; i--)
                for (int j = 1; j <= i + 1; j++)
                    accMap[i][j] = map[i][j] + Math.Max(accMap[i + 1][j - 1], Math.Max(accMap[i + 1][j], accMap[i + 1][j + 1]));

            sum = accMap[0][1];
            path = "";
            

            int oldj = 1;
            int newj = 0;

            // Find the path

            for (int i = 0; i < mapSize - 1; i++)
            {
                double sub = accMap[i][oldj] - map[i][oldj];
                
                if (sub == accMap[i + 1][oldj - 1])
                {
                    newj = oldj - 1;
                    path += 'l';
                }
                else
                if (sub == accMap[i + 1][oldj + 1])
                {
                    newj = oldj + 1;
                    path += 'r';
                }
                else
                {
                    newj = oldj;
                    path += 'd';
                }

                oldj = newj;
            }

        }

    
    }
}