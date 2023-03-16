//
//  ContentView.swift
//  SparkTokensDemo
//
//

import SwiftUI

extension UINavigationController {
    override open func viewDidLoad() {
        super.viewDidLoad()

    let standard = UINavigationBarAppearance()
        if #available(iOS 14.0, *) {
            standard.backgroundColor = UIColor(Color.brandOnPrimary)
        } else {
            // Fallback on earlier versions
        }
        //When you scroll or you have title (small one)

    let compact = UINavigationBarAppearance()
    if #available(iOS 14.0, *) {
        compact.backgroundColor = UIColor(Color.brandOnPrimary) //compact-height
    }

    let scrollEdge = UINavigationBarAppearance()
    if #available(iOS 14.0, *) {
        scrollEdge.backgroundColor = UIColor(Color.brandOnPrimary) //When you have large title
    }

    navigationBar.standardAppearance = standard
    navigationBar.compactAppearance = compact
    navigationBar.scrollEdgeAppearance = scrollEdge
 }
}

struct ContentView: View {
    init() {
        if #available(iOS 14.0, *) {
            UITableView.appearance().backgroundColor = UIColor(Color.brandOnPrimary)
        } else {
            // Fallback on earlier versions
        } // Uses UIColor
    }
    var body: some View {
        TabView {
            HomeView().tabItem {
                Image(systemName: "paperplane")
                Text("Home")
            }
            TokensView().tabItem {
                Image(systemName: "slider.horizontal.3")
                Text("Tokens")
            }
            ComponentsListView().tabItem {
                Image(systemName: "shippingbox")
                Text("Components")
            }
            GraphicsView().tabItem {
                Image(systemName: "wand.and.stars")
                Text("Graphics")
            }
        }.accentColor(Color.brandSecondary)
        .background(Color.brandOnPrimary)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
