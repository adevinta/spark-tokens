//
//  HomeView.swift
//  SparkTokensDemo
//
//

import Foundation
import SwiftUI
import SparkTokens

struct HomeView: View {
    var body: some View {
        VStack {
            Image.logo
                .resizable()
                .scaledToFit()
                .frame(minWidth: 0, maxWidth: 100)
                .padding(.bottom, Size.paddingMd)
            Text("Spark Tokens - iOS Demo")
                .foregroundColor(Color.brandMainMain)
                .font(.system(size: Size.fontTitleDisplay1))
        }
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.brandMainOnMain)
        .edgesIgnoringSafeArea(.all)
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
